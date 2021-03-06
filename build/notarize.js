require('dotenv').config();
const { notarize } = require('electron-notarize');

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;  
  if (electronPlatformName !== 'darwin') {
    return;
  }
  if (process.env.APPLEID === undefined) {
    return;
  }

  const appName = context.packager.appInfo.productFilename;

  console.log("Notarize");
  return await notarize({
    appBundleId: 'to.dub.ghanextron',
    appPath: `${appOutDir}/${appName}.app`,
    appleId: process.env.APPLEID,
    appleIdPassword: process.env.APPLEIDPASS,
  });
};
