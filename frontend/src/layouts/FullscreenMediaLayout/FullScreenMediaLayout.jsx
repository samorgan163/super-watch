import styles from './FullscreenMediaLayout.module.css';

export default function FullsreenMediaLayout({media, mediaOverlay, children}) {

    return (
        <div className={styles.wrapper}>
            <div className={styles.mediaWrapper}>
                {media}
            </div>
            <div className={styles.overlayAndContentWrapper}>
                <div className={styles.mediaOverlayWrapper}>
                    <div className={styles.left}>
                        {mediaOverlay}
                    </div>
                </div>
                <div className={styles.contentWrapper}>
                    {children}
                </div>
            </div>
            
        </div>
    );

}
