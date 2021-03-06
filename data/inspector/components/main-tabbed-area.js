/* See license.txt for terms of usage */

define(function(require, exports, module) {

// ReactJS
var React = require("react");
var ReactBootstrap = require("react-bootstrap");

// Firebug SDK
const { Reps } = require("reps/reps");

// RDP Inspector
const { ActorsPanel } = require("./actors-panel");
const { PacketsPanel } = require("./packets-panel");
const { SearchBox } = require("./search-box");

// Constants
const TabbedArea = React.createFactory(ReactBootstrap.TabbedArea);
const TabPane = React.createFactory(ReactBootstrap.TabPane);
const { DIV } = Reps.DOM;

/**
 * @template This template is responsible for rendering the main
 * application UI. The UI consist from set of tabs (Packets and Actors)
 * displaying list of sent/received packets and list of registered
 * actors.
 */
var MainTabbedArea = React.createClass({
/** @lends MainTabbedArea */

  displayName: "MainTabbedArea",

  getInitialState: function() {
    return { packets: [] };
  },

  componentDidMount: function() {
    var tabbedArea = this.refs.tabbedArea.getDOMNode();
    SearchBox.create(tabbedArea.querySelector(".nav-tabs"));
  },

  componentWillUnmount: function() {
    var tabbedArea = this.refs.tabbedArea.getDOMNode();
    SearchBox.destroy(tabbedArea.querySelector(".nav-tabs"));
  },

  render: function() {
    var packets = Locale.$STR("rdpInspector.tab.Packets");
    var actors = Locale.$STR("rdpInspector.tab.Actors");

    return (
      TabbedArea({className: "mainTabbedArea", defaultActiveKey: 1,
        animation: false, ref: "tabbedArea"},
        TabPane({eventKey: 1, tab: packets},
          PacketsPanel({
            packets: this.state.packets,
            actions: this.props.actions,
            selectedPacket: this.state.selectedPacket,
            searchFilter: this.state.searchFilter,
            showInlineDetails: this.state.showInlineDetails,
            removedPackets: this.state.removedPackets,
            paused: this.state.paused
          })
        ),
        TabPane({eventKey: 2, tab: actors},
          ActorsPanel({
            actions: this.props.actions,
            actors: this.state.actors,
            searchFilter: this.state.searchFilter
          })
        )
      )
    )
  }
});

// Exports from this module
exports.MainTabbedArea = React.createFactory(MainTabbedArea);
});
