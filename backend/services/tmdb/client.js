const axios = require('axios');
const rateLimit = require('axios-rate-limit');

const { ServiceUnavailableError, NotFoundError } = require('../../errors/customErrors');

class TmdbClient  {
    constructor(apiKey) {
        if (!apiKey) {
            throw new Error('TMDB api key missing');
        }

        this.tmdbBaseURL = 'https://api.themoviedb.org/3';
        this.responseTimeoutMs = 5000;
        this.apiKey = apiKey;

        this.maxRequests = 10;
        this.maxRequestsTimePeriodMs = 1000;

        // block all request on init if no api key provided
        this.isBlocked = false;
        this.isRateLimited = false;
        this.rateLimitCoolDownMs = 5000;

        // Base request
        const axiosInstance = axios.create({
            baseURL: this.tmdbBaseURL,
            timeout: this.responseTimeoutMs,
            headers: {
                Authorization: `Bearer ${this.apiKey}`,
            },
        });

        // Rate limit
        this.client = rateLimit(axiosInstance, { 
                maxRequests: this.maxRequests, 
                perMilliseconds: this.maxRequestsTimePeriodMs, 
            });
    }

    async request(config) {
        console.log('tmdb api pull');

        // Block all requests if there is an issue with access to tmdb api
        if (this.isBlocked) {
            throw new ServiceUnavailableError('TMDb api key issue');
        }

        if (this.isRateLimited) {
            throw new ServiceUnavailableError('TMDB rate limit exceeded');
        }

        try {
            const response = await this.client.request(config);
            return response;
        }
        catch (error) {
            throw this._handleError(error);
        }
    }

    // https://developer.themoviedb.org/docs/errors
    _handleError(error) {
        // if request timed out
        if (error.code === 'ECONNABORTED') {
            return new ServiceUnavailableError('TMDB request timeout', { cause: error });
        }

        // if tmdb no response
        if (!error.response) {
            return new ServiceUnavailableError('TMDB network error', { cause: error });
        }
    
        // if tmdb responded
        const status = error?.response?.status;
        const tmdbCode = error?.response?.data?.status_code;
        const tmdbMessage = error?.response?.data?.status_message;

        if (status === 429) {
            if (!this.isRateLimited) {
                this.isRateLimited = true;
                setTimeout(() => {
                    this.isRateLimited = false;
                }, this.rateLimitCoolDownMs);
            }
            return new ServiceUnavailableError('TMDb limit exceeded. Please try again later.', { cause: error});
        }

        if (status === 401 || status === 403) {
            if (tmdbCode === 7 || 
                tmdbCode === 10 || 
                tmdbCode === 31 || 
                tmdbCode === 33 ||
                tmdbCode === 35 ||
                tmdbCode === 45
            ) {
                this.isBlocked = true;
                return new ServiceUnavailableError('TMDb api key issue', { cause: error});
            }
        }

        if (status === 404) {
            return new NotFoundError('TMDB not found');
        }

        return new ServiceUnavailableError(`TMDB error, code: ${tmdbCode}`, { cause: error});        
    }

}

module.exports = TmdbClient;
