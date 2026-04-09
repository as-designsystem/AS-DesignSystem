import { Link } from 'react-router-dom';
import './Welcome.css';

export default function Welcome() {
  return (
    <div className="welcome-page">
      {/* Hero Section */}
      <section className="welcome-hero">
        <div className="welcome-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          AS Design System
        </div>
        <h1 className="welcome-title">
          Build beautiful apps<br />with full control
        </h1>
        <p className="welcome-subtitle">
          A React design system for Airline Sciences, compatible with Airbus design guidelines.
          Install ready-to-use components directly into your project via CLI.
        </p>
      </section>

      {/* Stats */}
      <section className="welcome-stats">
        <div className="welcome-stat">
          <div className="welcome-stat-value">28</div>
          <div className="welcome-stat-label">Components</div>
        </div>
        <div className="welcome-stat">
          <div className="welcome-stat-value">15</div>
          <div className="welcome-stat-label">Composites</div>
        </div>
        <div className="welcome-stat">
          <div className="welcome-stat-value">150+</div>
          <div className="welcome-stat-label">Icons</div>
        </div>
        <div className="welcome-stat">
          <div className="welcome-stat-value">22</div>
          <div className="welcome-stat-label">Tool Icons</div>
        </div>
        <div className="welcome-stat">
          <div className="welcome-stat-value">100%</div>
          <div className="welcome-stat-label">TypeScript</div>
        </div>
      </section>

      {/* Installation Methods */}
      <section style={{ marginBottom: '48px' }}>
        <h2 className="welcome-section-title">Get Started</h2>
        <p className="welcome-section-desc">
          Choose the installation method that best fits your workflow. Both require a one-time registry configuration with your access token.
        </p>
        <div className="welcome-install-methods">
          <Link to="/getting-started/local-installation" className="welcome-install-card">
            <div className="welcome-install-card__badge">Recommended</div>
            <div className="welcome-install-card__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <h3 className="welcome-install-card__title">Local Installation</h3>
            <p className="welcome-install-card__desc">
              Install per-project using <code>npx</code>. No global setup needed. Ideal for teams where each project manages its own dependencies.
            </p>
            <div className="welcome-install-card__code">
              <code>npx @as-designsystem/cli init</code>
            </div>
            <span className="welcome-install-card__link">
              Get started
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </span>
          </Link>

          <Link to="/getting-started/global-installation" className="welcome-install-card">
            <div className="welcome-install-card__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
            <h3 className="welcome-install-card__title">Global Installation</h3>
            <p className="welcome-install-card__desc">
              Install the CLI globally on your machine. Use the <code>asds</code> command directly from any project without <code>npx</code>.
            </p>
            <div className="welcome-install-card__code">
              <code>asds init</code>
            </div>
            <span className="welcome-install-card__link">
              Get started
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </span>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section style={{ marginBottom: '48px' }}>
        <h2 className="welcome-section-title">Why AS Design System?</h2>
        <div className="welcome-features">
          <div className="example-container">
            <div className="welcome-feature">
              <div className="welcome-feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              </div>
              <h3 className="welcome-feature-title">Full Ownership</h3>
              <p className="welcome-feature-desc">
                Components are copied directly into your project. Modify, extend, or refactor as needed.
              </p>
            </div>
          </div>

          <div className="example-container">
            <div className="welcome-feature">
              <div className="welcome-feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="21" x2="9" y2="9" />
                </svg>
              </div>
              <h3 className="welcome-feature-title">Design Tokens</h3>
              <p className="welcome-feature-desc">
                Consistent colors, typography, and spacing. Available as CSS variables and TypeScript.
              </p>
            </div>
          </div>

          <div className="example-container">
            <div className="welcome-feature">
              <div className="welcome-feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <h3 className="welcome-feature-title">Zero Runtime</h3>
              <p className="welcome-feature-desc">
                No external runtime dependencies. Just React, CSS, and your code.
              </p>
            </div>
          </div>

          <div className="example-container">
            <div className="welcome-feature">
              <div className="welcome-feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="welcome-feature-title">Type Safe</h3>
              <p className="welcome-feature-desc">
                Built with TypeScript. Full autocomplete and type checking out of the box.
              </p>
            </div>
          </div>

          <div className="example-container">
            <div className="welcome-feature">
              <div className="welcome-feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <h3 className="welcome-feature-title">Easy Updates</h3>
              <p className="welcome-feature-desc">
                Update components with a single CLI command while keeping your customizations.
              </p>
            </div>
          </div>

          <div className="example-container">
            <div className="welcome-feature">
              <div className="welcome-feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
              <h3 className="welcome-feature-title">Modular</h3>
              <p className="welcome-feature-desc">
                Install only what you need. Each component is independent and self-contained.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
