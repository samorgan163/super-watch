import axios from 'axios';
import rateLimit from 'axios-rate-limit';
import { 
    ServiceUnavailableError, 
    NotFoundError 
} from '../../errors/customErrors.js';

class TmdbClient  {
    constructor({
        apiKey,
        maxRequests = 10,
        maxRequestsTimePeriodMs = 10000,
        responseTimeoutMs = 5000,
    }) {
        if (!apiKey) {
            throw new Error('TMDB api key missing');
        }

        this.tmdbBaseURL = 'https://api.themoviedb.org/3';
        this.responseTimeoutMs = responseTimeoutMs;
        this.apiKey = apiKey;

        this.maxRequests = maxRequests;
        this.maxRequestsTimePeriodMs = maxRequestsTimePeriodMs;

        // flag to block all requests if there is an issue with tmdb api key or access
        this.isBlocked = false;

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

        try {
            const response = await this.client.request(config);
            return response;
        }
        catch (error) {
            throw this._handleError(error);
        }
    }

    // TMDB error codes
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
            return new ServiceUnavailableError('TMDb limit exceeded. Please try again later.', { cause: error });
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
                return new ServiceUnavailableError('TMDb api key issue', { cause: error });
            }
        }

        if (status === 404) {
            return new NotFoundError('TMDB not found', { cause: error });
        }

        return new ServiceUnavailableError('TMDb error', { cause: error });        
    }

}

export default TmdbClient;
