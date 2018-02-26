import { computed } from '@ember/object';
import { inject } from '@ember/service';
import Route from '@ember/routing/route';
import CasAuthenticatedRouteMixin from 'ember-osf/mixins/cas-authenticated-route';
import ResetScrollMixin from '../mixins/reset-scroll';
import SetupSubmitControllerMixin from '../mixins/setup-submit-controller';
import Analytics from 'ember-osf/mixins/analytics';
import ConfirmationMixin from 'ember-onbeforeunload/mixins/confirmation';

/**
 * @module ember-preprints
 * @submodule routes
 */

/**
 * Creates a preprint record
 * @class Submit Route Handler
 */
export default Route.extend(ConfirmationMixin, Analytics, ResetScrollMixin, CasAuthenticatedRouteMixin, SetupSubmitControllerMixin, {
    i18n: inject(),
    currentUser: inject('currentUser'),
    panelActions: inject('panelActions'),
    confirmationMessage: computed('i18n', function() {
        return this.get('i18n').t('submit.abandon_preprint_confirmation');
    }),

    model() {
        // Store the empty preprint to be created on the model hook for page. Node will be fetched
        //  internally during submission process.
        return this.store.createRecord('preprint', {
            subjects: []
        });
    },
    afterModel() {
        return this.get('theme.provider').then(provider => {
            if (!provider.get('allowSubmissions')) {
                this.replaceWith('page-not-found');
            }
        })
    },
    setupController(controller, model) {
        this.setupSubmitController(controller, model);
        return this._super(...arguments);
    },
    isPageDirty() {
        // If true, shows a confirmation message when leaving the page
        // True if the user already created/chosen a project node
        return this.controller.get('hasDirtyFields');
    },
    shouldCheckIsPageDirty(transition) {
        // Allows the 'provider.content.index' route as an acception
        // to the dirty message upon preprint submit
        const isChildRouteTransition = this._super(...arguments);
        const submitRoute = `${this.controller.get('theme.isSubRoute') ? 'provider.' : ''}content`;

        if (transition.targetName === submitRoute + '.index') {
            return true;
        } else {
            return isChildRouteTransition;
        }
    }
});
