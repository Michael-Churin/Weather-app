import React from 'react';

const initialState = {
    hasError: false
}
type State = Readonly<typeof initialState> 

class ErrorBoundary extends React.Component<{}, State> {
    public readonly state: State = initialState
  
    public static getDerivedStateFromError(error: Error): State {
      return { hasError: true };
    }
  
    public componentDidCatch(error: Error, info: React.ErrorInfo) {
      console.log(error.message);
    }
  
    public render() {
      if (this.state.hasError)
        return <h1>Что-то пошло не так.</h1>;
  
      return this.props.children; 
    }
}

export default ErrorBoundary;