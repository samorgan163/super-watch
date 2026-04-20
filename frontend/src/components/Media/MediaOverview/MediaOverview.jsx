import styles from './MediaOverview.module.css';

export default function MediaOverview({ overview }) {

    const fallbackOverview = 'No overview available.';
    const cleanedOverview = overview.trim() || fallbackOverview;

    return (
        <p>
            {cleanedOverview}
        </p>
    );

}
