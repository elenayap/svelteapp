export const ssr = false; // this essentially turns our entire project into true SPA mode. No JS code will execute server side.
import {isLoggedIn} from '../utils/auth.js'; // import this so the component can use in every pages

export async function load() { //the first function name must be "load"
    await isLoggedIn();
}
