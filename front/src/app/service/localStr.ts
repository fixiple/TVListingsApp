import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export default class localStr{
    constructor() { }

    /**
     * Saves the Key and Value in localStorage
     * @param {string} key  The key to be used as reference
     * @param {string} value  The value we wanna store
    **/
    public saveData(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    /**
     * Saves the Key and Object in localStorage
     * @param {string} key  The key to be used as reference
     * @param {Object} value  The value we wanna store as JSON Object
    **/
    public saveDataObject(key: string, value: Object) {
        localStorage.setItem(key, JSON.stringify(value));
    }

  
    /** 
     * Gets the Value in localStorage using the Key
     * @param {string} key  The Key attached to the value we wanna get
     * @returns {string}  Returns the value of the Key in String format
     * @returns {null} or null if Key is not found
     **/ 
    public getData(key: string) : string|null {
        return localStorage.getItem(key) !== null ? localStorage.getItem(key) : ""
    }

        /** 
     * Gets the Object in localStorage using the Key
     * @param {string} key  The Key attached to the value we wanna get
     * @returns {string}  Returns the value of the Key in String format
     **/ 
        public getDataObject(key: string) : any {
            return localStorage.getItem(key) !== null ? JSON.parse(localStorage.getItem(key)!) : null
        }
    

    /** 
     * Removes the Key-value pair from the localStorage
     * @param {string} key  The Key attached to the value we wanna remove
     **/ 
    public removeData(key: string) {
        localStorage.removeItem(key);
    }

    /** 
     * Wipes the localStorage totally clean
     **/
    public clearData() {
        localStorage.clear();
    }
}