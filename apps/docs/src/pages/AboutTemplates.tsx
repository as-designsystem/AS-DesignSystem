import './Tokens.css';
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
    <div className="tokens-page">
      <h1>About Templates</h1>
      <p>
        Page templates are pre-built page layouts that you can install directly into your project. Unlike components that go into your design system folder, templates are installed into your project pages and are meant to be customized.
      </p>

      <section className="tokens-section">
        <h2>Installing Templates</h2>
        <p>Use the CLI to install templates into your project:</p>
        <div className="code-block">
          <code>{installCode}</code>
        </div>
      </section>

      <section className="tokens-section">
        <h2>Key Differences from Components</h2>
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

      <section className="tokens-section">
        <h2>Customization</h2>
        <p>After installing a template, you own the code. Feel free to:</p>
        <ul>
          <li>Modify the layout structure</li>
          <li>Add or remove sections</li>
          <li>Connect to your data sources</li>
          <li>Adjust styles to match your brand</li>
          <li>Rename files as needed</li>
        </ul>
      </section>
    </div>
  );
}
