// *** MODULE CREATES OVERALL PAGE STRUCTURE AND RESTORES LOCAL DATA *** //
import { pageStructure } from './pageStructure.js';
import { restoreData } from './localStorage.js';

(function buildPage(){
    //builds the page
    pageStructure();
    //restores data from local storage
    restoreData();
})();

