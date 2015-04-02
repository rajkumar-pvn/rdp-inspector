/* See license.txt for terms of usage */

define(function(require, exports, module) {

// Dependencies
const React = require("react");
const { PacketList } = require("./packet-list");
const { PacketDetails } = require("./packet-details");
const { Reps } = require("reps/repository");

// Shortcuts
const { TR, TD, TABLE, TBODY, THEAD, TH, DIV } = Reps.DOM;

/**
 * @template This template renders 'Packets' tab body.
 */
var PacketsTabBody = React.createClass({
  displayName: "PacketsTabBody",

  getInitialState: function() {
    return {
      packets: this.props.packets,
      selectedPacket: null
    };
  },

  render: function() {
    return (
      DIV({className: "packetsTabBodyBox"},
        DIV({className: "list"},
          PacketList({
            data: this.state.packets,
            actions: this.props.actions
          })
        ),
        DIV({className: "details"},
          PacketDetails({
            data: this.state.selectedPacket
          })
        ),
        DIV({className: "footer"})
      )
    );
  }
});

// Exports from this module
exports.PacketsTabBody = React.createFactory(PacketsTabBody);

});