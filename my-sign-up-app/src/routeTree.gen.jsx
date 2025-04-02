import rootRoute from './routes/__root';
import { Route as indexRoute } from './routes/index';

const routeTree = rootRoute.addChildren([indexRoute]); // Add the home page route as a child

export { routeTree };