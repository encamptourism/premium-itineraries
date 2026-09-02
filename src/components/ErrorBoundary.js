'use client';

import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary caught an error]:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback({ error: this.state.error, reset: this.resetError });
      }

      return (
        <div className="min-h-[400px] w-full flex items-center justify-center p-6 bg-[#f8f5ed]">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-stone-200/80 shadow-xl shadow-stone-200/50 text-center space-y-6">
            <div className="w-16 h-16 bg-amber-50 rounded-2xl border border-amber-200/60 flex items-center justify-center mx-auto text-[#dfa62f]">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-[#062212]">
                {this.props.title || 'Something went wrong'}
              </h2>
              <p className="text-stone-500 text-sm leading-relaxed">
                {this.state.error?.message ||
                  'An unexpected error occurred while rendering this component. Our team has been notified.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={this.resetError}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#062212] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#0b3a24] transition-all shadow-md active:scale-95"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>

              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-stone-300 text-stone-700 font-bold text-xs uppercase tracking-wider hover:bg-stone-100 transition-all"
              >
                <Home className="w-4 h-4" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
