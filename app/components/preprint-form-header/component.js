// import { computed } from '@ember/object';
import Component from '@ember/component';

/**
 * @module ember-osf-preprints
 * @submodule components
 */

/**
 * Customizes the collapsible panel header.
 *
 * Sample usage:
 * ```handlebars
 * {{preprint-form-header}}
 *    name=(if nodeLocked 'preprint_file' 'choose_file')
 *    selectedFile=osfFile
 *    fileVersion=fileVersion
 *    file=file
 *    valid=isValid
 * }}
 * ```
 * @class preprint-form-header
 * */
export default Component.extend({
    tagName: '',

    // CSS controls icon color and display.
    // If neither valid nor invalid state applies, don't show icon.
    // classNameBindings: ['valid:valid', 'invalid:invalid'],

    // Variables to pass in
    valid: null,
    // isValidationActive: false,

    // Calculated properties
    // invalid: computed('valid', 'isValidationActive', function() {
    //     // If the user hasn't even opened the panel yet, don't run the validation check
    //     // In other words, not true or null
    //     if (this.get('isValidationActive')) {
    //         return !this.get('valid');
    //     } else {
    //         return false;
    //     }
    // }),

});