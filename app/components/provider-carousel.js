import Component from '@ember/component';
import { A } from '@ember/array';
import { computed } from '@ember/object';
import { run } from '@ember/runloop';
import $ from 'jquery';
import Analytics from 'ember-osf/mixins/analytics';
/**
 * @module ember-preprints
 * @submodule components
 */

/**
 * Displays active preprint providers in a horizontal carousel with five providers per slide. Does not auto-advance.
 * Handles display on two pages: index (lightLogo=true) and discover (lightLogo=false).  If using elsewhere, need to add more customization
 * around how provider logos and links are built.
 *
 * Sample usage:
 * ```handlebars
 * {{provider-carousel
 *      providers=providers
 *      lightLogo=true
 *}}
 * ```
 * @class provider-carousel
 */
export default Component.extend(Analytics, {
    _resizeListener: null,
    providers: A(), // Pass in preprint providers
    itemsPerSlide: 5, // Default
    lightLogo: true, // Light logos by default, for Index page.
    editedProviders: computed('providers', function() {
        let newProviders = A()
        for (const provider of this.get('providers')) {
          if (provider && provider.get('id')!== 'livedata') {
              newProviders.pushObject(provider)
          }
        }
        return newProviders;
    }),
    numProviders: computed('editedProviders', function() {
        return this.get('editedProviders').length;
    }),
    numSlides: computed('numProviders', 'itemsPerSlide', function() {
        return Math.ceil(this.get('numProviders') / this.get('itemsPerSlide'));
    }),
    slides: computed('numSlides', 'editedProviders', 'itemsPerSlide', function() {
        const numSlides = this.get('numSlides');
        const itemsPerSlide = this.get('itemsPerSlide');
        return new Array(numSlides).fill().map((_, i) => this.get('editedProviders').slice(i * itemsPerSlide, i * itemsPerSlide + itemsPerSlide));
    }),
    columnOffset: computed('numProviders', 'itemsPerSlide', function() {
        // If only one slide of providers, center the provider logos by adding a column offset.
        let offset = 'col-sm-offset-1';
        const numProviders = this.get('numProviders');
        if (numProviders <= this.get('itemsPerSlide')) {
            switch (numProviders) {
                case 1:
                    offset = 'col-sm-offset-5';
                    break;
                case 2:
                    offset = 'col-sm-offset-4';
                    break;
                case 3:
                    offset = 'col-sm-offset-3';
                    break;
                case 4:
                    offset = 'col-sm-offset-2';
                    break;
                case 5:
                    offset = 'col-sm-offset-1';
                    break;
            }
        }
        return offset;
    }),
    setSlideItems: function() {
        // On xs screens, show one provider per slide. Otherwise, five.
        if (window.innerWidth < 768) {
            this.set('itemsPerSlide', 1);
        } else {
            this.set('itemsPerSlide', 5);
        }
    },
    didInsertElement: function () {
        $('.carousel').carousel();
    },
    init: function() {
        // Set resize listener so number of providers per slide can be changed
        this._super(...arguments);
        this.setSlideItems();
        this._resizeListener = run.bind(this, this.setSlideItems);
        $(window).on('resize', this._resizeListener);
    },
    willDestroy: function() {
        // Unbinds _resizeListener
        if (this._resizeListener) {
            $(window).off('resize', this._resizeListener);
        }
    }
});
