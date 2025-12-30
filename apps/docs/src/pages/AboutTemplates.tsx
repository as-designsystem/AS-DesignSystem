import './AboutTemplates.css';

export default function AboutTemplatesPage() {
  const installCode = `# Install a template
asds add <template-name>

# Example: Install the HomePage template
asds add home-page

# This will:
# 1. Install all required dependencies (AppHeader, ProductPanel, etc.)
# 2. Copy the template files to src/pages/
# 3. You can then customize the template for your needs`;

  return (
    <div className="component-page">
      <h1 className="heading-5" style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
        About Templates
      </h1>
      <p className="label-regular-m" style={{ marginTop: '12px', marginBottom: '24px', color: 'var(--text-secondary, var(--cool-grey-70, #63728a))' }}>
        Page templates are pre-built page layouts that you can install directly into your project. Unlike components that go into your design system folder, templates are installed into your project pages and are meant to be customized.
      </p>

      <section className="component-section">
        <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
          Installing Templates
        </h2>
        <p className="label-regular-m" style={{ marginBottom: '16px', color: 'var(--text-main, #14171d)' }}>
          Use the CLI to install templates into your project:
        </p>
        <div className="code-block">
          <pre><code>{installCode}</code></pre>
        </div>
      </section>

      <section className="component-section">
        <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
          Key Differences from Components
        </h2>
        <div className="comparison-table">
          <table>
            <thead>
              <tr>
                <th>Aspect</th>
                <th>Components</th>
                <th>Templates</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>Location</code></td>
                <td><code>src/design-system/</code></td>
                <td><code>src/pages/</code></td>
              </tr>
              <tr>
                <td><code>Purpose</code></td>
                <td>Reusable UI primitives</td>
                <td>Full page layouts</td>
              </tr>
              <tr>
                <td><code>Customization</code></td>
                <td>Props-based configuration</td>
                <td>Direct code modification</td>
              </tr>
              <tr>
                <td><code>Updates</code></td>
                <td>Can be updated via CLI</td>
                <td>One-time installation</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="component-section">
        <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
          Customization
        </h2>
        <p className="label-regular-m" style={{ marginBottom: '16px', color: 'var(--text-main, #14171d)' }}>
          After installing a template, you own the code. Feel free to:
        </p>
        <ul style={{ paddingLeft: '20px', color: 'var(--text-main, #14171d)' }}>
          <li className="label-regular-m">Modify the layout structure</li>
          <li className="label-regular-m">Add or remove sections</li>
          <li className="label-regular-m">Connect to your data sources</li>
          <li className="label-regular-m">Adjust styles to match your brand</li>
          <li className="label-regular-m">Rename files as needed</li>
        </ul>
      </section>
    </div>
  );
}
