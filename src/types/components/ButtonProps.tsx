export interface ButtonProps {
    title: string,
    type?: "button" | "submit" | "reset"
    onClick?: () => void
}