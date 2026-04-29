import styles from './Button.module.css';

export default function Button({
    children,
    icon,
    iconOnly,
    as: Component = 'button',
    onClick,
    disabled = false,
    loading,
    variant = 'primary',
    ...props
}) {

    const content = iconOnly ? (
        icon ? <span className={styles.iconWrapper}>{icon}</span> : null
    ) : (
        <>
            {icon && <span className={styles.iconWrapper}>{icon}</span>}
            <span className={styles.label}>{children}</span>
        </>
    );

    const variantClass = styles[variant];

    return (
        <Component
            className={`
                ${styles.button}
                ${variantClass}
                ${iconOnly && styles.iconOnly}
                ${Component !== 'button' ? styles.nonInteractive : ''}
            `}
            onClick={onClick}
            disabled={disabled || loading}
            {...props}
        >
            {content}
        </Component>
    );

}
