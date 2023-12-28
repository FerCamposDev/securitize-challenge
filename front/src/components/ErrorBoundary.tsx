import { Grid, Typography } from "@mui/material";
import React, { ErrorInfo, ReactNode } from "react";

type Props = {
  children: ReactNode;
}

type State = {
  hasError: boolean;
  message: string;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error?.message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
      <Grid container justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h3" textAlign="center">
          Something went wrong.
        </Typography>
        <Typography variant="subtitle2">
          {this.state.message}
        </Typography>
    </Grid>);
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
