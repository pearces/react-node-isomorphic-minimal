const enzyme = require('enzyme');
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17');

const { configure } = enzyme;
configure({ adapter: new Adapter() });
