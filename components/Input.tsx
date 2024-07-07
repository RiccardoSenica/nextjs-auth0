import * as React from 'react';

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ type, ...props }, ref) => {
  return <input type={type} ref={ref} {...props} />;
});
Input.displayName = 'Input';

export { Input };