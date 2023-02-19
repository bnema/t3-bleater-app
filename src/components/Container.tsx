export function Container({ children, classNames="" }: { 
    children: React.ReactNode
    classNames?: string
 }) {
    return (
        <div className={`${classNames} m-auto max-w-xl text-graywolf-100 p-5`}>
            {children}
        </div>
    );
}