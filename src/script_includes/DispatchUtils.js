// Table: sys_script_include
// Name: DispatchUtils
// API Name: x_custom.DispatchUtils
// Active: true
// Description: Utilities for field service dispatch and scheduling.

var DispatchUtils = Class.create();
DispatchUtils.prototype = {
    initialize: function() {},

    /**
     * Get all work orders assigned to a field agent.
     * @param {string} agentSysId
     * @param {string} state - optional filter ('1'=open, '2'=in progress)
     * @returns {Array}
     */
    getOrdersForAgent: function(agentSysId, state) {
        var results = [];
        var gr = new GlideRecord('wm_order');
        gr.addQuery('assigned_to', agentSysId);
        if (state) gr.addQuery('state', state);
        gr.orderBy('expected_start');
        gr.query();
        while (gr.next()) {
            results.push({
                number:         gr.number.toString(),
                sys_id:         gr.getUniqueValue(),
                description:    gr.short_description.toString(),
                location:       gr.location.getDisplayValue(),
                expected_start: gr.expected_start.toString(),
                state:          gr.state.getDisplayValue()
            });
        }
        return results;
    },

    /**
     * Calculate daily workload for all field agents.
     * @param {string} date - GlideDateTime string (YYYY-MM-DD)
     * @returns {Object} map of agentSysId -> count
     */
    getDailyWorkload: function(date) {
        var workload = {};
        var ga = new GlideAggregate('wm_order');
        ga.addAggregate('COUNT', 'assigned_to');
        ga.groupBy('assigned_to');
        ga.addQuery('expected_start', 'STARTSWITH', date);
        ga.query();
        while (ga.next()) {
            workload[ga.assigned_to.toString()] =
                parseInt(ga.getAggregate('COUNT', 'assigned_to'), 10);
        }
        return workload;
    },

    type: 'DispatchUtils'
};
