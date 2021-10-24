export default function Alert({ children, className }) {
  return (
    <div role="alert" className={`alert ${className}`}>
      {children}
    </div>
  );
}
