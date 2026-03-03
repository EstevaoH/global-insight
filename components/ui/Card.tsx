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
            className={`glass-card p-6 ${onClick ? 'cursor-pointer' : ''} ${className}`}
            style={style}
        >
            {children}
        </Tag>
    );
}
