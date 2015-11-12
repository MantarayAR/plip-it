PlipsListComponent = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    var loaded = Meteor.subscribe("plips", this.props.videoId);
    var currentTime = this.props.currentTime;

    var lowTime = Math.max(-1, currentTime - 20);
    var highTime = currentTime + 1;

    return {
      isLoading: ! loaded.ready(),
      plips: Plips.find({
        videoTimestamp: {
          $gt: lowTime,
          $lt: highTime
        }
      }, {
        sort: {
          videoTimestamp: -1,
          createdAt: -1
        }
      }).fetch()
    }
  },
  render() {
    if (this.data.isLoading) {
      return <AppLoadingComponent noText={true} />
    }

    return (
      <TransitionGroup
            className="plips__list collection plip-items"
            transitionName='slide-down'
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000}
            name="plip-items">
        {this.data.plips.map(function(plip, i){
          return (
            <div key={i}>
              <PlipListItemComponent plip={plip} />
            </div>
          );
        })}
      </TransitionGroup>
    );
  }
});
