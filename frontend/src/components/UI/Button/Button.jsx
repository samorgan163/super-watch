import styles from './Button.module.css';

export default function Button({
    children,
    icon,
    iconOnly,
    as: Component = 'button',
    onClick,
    disabled = false,
    loading,
}) {

    const content = iconOnly ? (
        icon ? <span className={styles.iconWrapper}>{icon}</span> : null
    ) : (
        <>
            {icon && <span className={styles.iconWrapper}>{icon}</span>}
            <span className={styles.label}>{children}</span>
        </>
    );

    return (
        <Component
            className={`
                ${styles.button}
                ${iconOnly && styles.iconOnly}
                ${Component !== 'button' ? styles.nonInteractive : ''}
            `}
            onClick={onClick}
            disabled={disabled || loading}
        >
            {content}
        </Component>
    );

}
