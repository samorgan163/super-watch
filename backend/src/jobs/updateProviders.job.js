import db from '../config/db.js';
import { update } from '../models/provider.model.js';
import { getWatchProviders } from '../services/tmdb/tmdb.service.js';

export async function updateProviders() {
    const connection = await db.getConnection();
    try {
        // get providers from tmdb
        const providers = await getWatchProviders();
        
        // update database
        await connection.beginTransaction();

        // TODO: batch 
        for (const provider of providers) {
            await update({
                id: provider.provider_id, 
                name: provider.provider_name, 
                logo_path: provider.logo_path
            }, connection)
        }
        await connection.commit();
    } 
    catch (error) {
        await connection.rollback();
        console.error('Failed to update watch providers');
    }
    finally {
        connection.release();
    }
}
