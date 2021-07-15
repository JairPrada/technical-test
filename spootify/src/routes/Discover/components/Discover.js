import React, { Component } from "react";
import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";
import "../styles/_discover.scss";
import fetchData from "./helpers/fetchData";

export default class Discover extends Component {
  constructor() {
    super();
    this.state = {
      newReleases: [],
      playlists: [],
      categories: [],
    };
  }
  async componentWillMount() {
    //Get data and deconstruct response
    const dataNewReleases = await fetchData("browse/new-releases");
    const dataPlaylists = await fetchData("browse/featured-playlists");
    const dataCategories = await fetchData("browse/categories");
    // Update State
    this.setState({
      newReleases:dataNewReleases?.albums?.items || [],
      playlists:dataPlaylists?.playlists?.items || [],
      categories:dataCategories?.categories?.items || [],
    });
    console.log(this.state);
  }
  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        <DiscoverBlock
          text="RELEASED THIS WEEK"
          id="released"
          data={newReleases}
        />
        <DiscoverBlock
          text="FEATURED PLAYLISTS"
          id="featured"
          data={playlists}
        />
        <DiscoverBlock
          text="BROWSE"
          id="browse"
          data={categories}
          imagesKey="icons"
        />
      </div>
    );
  }
}
