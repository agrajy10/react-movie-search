export default function MainContainer({ className, children }) {
  return (
    <div className={`max-w-screen-xl mx-auto px-4 ${className}`}>
      {children}
    </div>
  );
}
