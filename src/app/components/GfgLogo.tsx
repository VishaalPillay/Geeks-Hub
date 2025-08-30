// This component renders the official GFG icon and is colored by text classes.
const GfgLogo = ({ className }: { className?: string }) => (
    <svg
      role="img"
      aria-label="GeekforGeeks Logo"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={`fill-current ${className}`}
    >
      <path d="M11.178 20.375l-1.43 1.428-9.748-9.799 9.748-9.8 1.43 1.429-8.293 8.371 8.293 8.37zm1.644-18.947l1.429-1.428 9.748 9.8-9.748 9.799-1.429-1.428 8.321-8.371-8.321-8.372z" />
    </svg>
  );
  
  export default GfgLogo;