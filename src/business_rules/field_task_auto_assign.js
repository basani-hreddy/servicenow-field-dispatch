// Table: wm_order  (Business Rule)
// Name: Field Task Auto Assign
// Trigger table: wm_order
// When: before
// Actions: insert=true update=true delete=false query=false
// Description: Auto-assign work orders to nearest available field agent.

(function executeRule(current, previous) {
    if (!current.assigned_to.nil()) return; // already assigned

    var location = current.location.toString();
    if (!location) return;

    // Find available field agents in same location
    var agent = new GlideRecord('sys_user');
    agent.addQuery('location', location);
    agent.addQuery('u_field_agent', true);
    agent.addQuery('active', true);
    agent.setLimit(1);
    agent.query();

    if (agent.next()) {
        current.assigned_to = agent.getUniqueValue();
        current.work_notes  = 'Auto-assigned to ' + agent.getDisplayValue()
            + ' (location match) on ' + gs.nowDateTime();
    } else {
        // Fallback: assign to default dispatch group
        var grp = gs.getProperty('field_dispatch.default_group', '');
        if (grp) {
            current.assignment_group = grp;
            current.work_notes = 'No local agent found. Assigned to dispatch group.';
        }
    }
})(current, previous);
