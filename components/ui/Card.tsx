import { CSSProperties, ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    style?: CSSProperties;
    className?: string;
    onClick?: () => void;
    as?: 'div' | 'article' | 'section';
}

export function Card({ children, style, className = '', onClick, as: Tag = 'div' }: CardProps) {
    return (
        <Tag
            onClick={onClick}
            className={`glass-card ${className}`}
            style={{
                padding: '24px',
                cursor: onClick ? 'pointer' : undefined,
                ...style,
            }}
        >
            {children}
        </Tag>
    );
}
