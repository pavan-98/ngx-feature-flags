# ngx-feature-flags

This repository contains the source code for the **ngx-feature-flag-guard** Angular library.

> **Looking for usage documentation?**  
> Check the library documentation here: [projects/ngx-feature-flag-guard/README.md](projects/ngx-feature-flag-guard/README.md)

## Overview

This project provides an Angular-first feature flag execution layer designed for enterprise scale. It standardizes how feature flags are resolved, guarded against, and rendered in Angular applications.

## Compatibility

| Angular Version | Support |
| :--- | :--- |
| **v16+** | ✅ Fully Supported |
| **v14 - v15** | ⚠️ Should work (uses `standalone` & `inject`) but untested |
| **< v14** | ❌ Not Supported |

## Development

### Prerequisites

- Node.js (Active LTS version)
- npm

### Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/YOUR_USERNAME/ngx-feature-flags.git
cd ngx-feature-flags
npm install
```

### Building the Library

To build the library for distribution:

```bash
ng build ngx-feature-flag-guard
```

Artifacts will be generated in the `dist/ngx-feature-flag-guard` directory.

### Running Tests

Run the unit tests using Vitest:

```bash
ng test ngx-feature-flag-guard
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.