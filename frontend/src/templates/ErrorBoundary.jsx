// error boundary
// class complnent

import React from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(error) {
    console.log(error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h3>Something went wrong</h3>
          <p>
            <Link to="/">Go back to the homepage</Link>
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
