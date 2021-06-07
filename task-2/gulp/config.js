const sourcePath = 'src';
const destinationPath = 'dist';

const paths = {
  source: {
    root: sourcePath,
    html: `${sourcePath}/html`,
    styles: `${sourcePath}/scss`,
    images: `${sourcePath}/images`,
    iconsPNG: `${sourcePath}/images/icons/PNG`,
    iconsSVG: `${sourcePath}/images/icons/SVG`,
    fonts: `${sourcePath}/fonts`,
    scripts: `${sourcePath}/js`,
  },

  destination: {
    root: destinationPath,
    html: destinationPath,
    styles: `${destinationPath}/css`,
    images: `${destinationPath}/images`,
    fonts: `${destinationPath}/fonts`,
    scripts: `${destinationPath}/js`,
  },
};

const environment = {
  setEnvironment() {
    process.env.NODE_ENV = 'development';
    this.isProduction = process.argv.includes('--prod');
    this.isDevelopment = !this.isProduction;

    if (this.isProduction) {
      process.env.NODE_ENV = 'production';
      console.log(
        '\n\t\t\t \x1b[1;31m --- PRODUCTION MODE ACTIVATED --- \x1b[0m \n',
      );
    }
  },
};

const description = {
  begin: '\x1b[32m Description: ',
  end: `\x1b[34m ${destinationPath}\x1b[32m folder. \x1b[0m`,
};
/* EXAMPLE */
// someTask.description = `${description.begin}\  delete all files in build
// folder\  ${description.end}`;

export { paths, environment, description };
