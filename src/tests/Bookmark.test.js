import "@testing-library/jest-dom";
import { render, cleanup, screen } from "@testing-library/react";
import Bookmark from "../components/Bookmark";

afterEach(cleanup);

const videoRawData = {
  duration: "17:50",
  thumbnail_url: "https://i.vimeocdn.com/video/1169280957-6513b97be812eac51f6ba090b2f34ab5a63bfc220076c0118950fcf4c227fdce-d_295x166",
  title: "Sylvain Lhommée @ Nation Entreprenante - Episode #5",
  upload_date: "21 juin 2021",
  author_name: "BARTERLINK",
  type: "video",
  url: "https://vimeo.com/565486457",
};

const photoRawData = {
  height: 685,
  type: "photo",
  author_name: "Pierre Metivier",
  url: "https://www.flickr.com/photos/feuilllu/45771361701/in/photostream/",
  width: 1024,
  thumbnail_url: "https://live.staticflickr.com/4817/45771361701_2678123510_q.jpg",
  title: "2018 Visite de Klaxoon",
};

describe("Bookmark", () => {
  it("Should render an image tag with thumbnail path and video length", () => {
    render(<Bookmark bookmark={videoRawData} />);
    expect(screen.getByRole("img", { name: "thumbnail" }).src).toContain(videoRawData["thumbnail_url"]);
    expect(screen.getByText("17:50")).toBeTruthy();
  });

  it("Should render an image tag with thumbnail path and photo dimensions", () => {
    render(<Bookmark bookmark={photoRawData} />);
    expect(screen.getByRole("img", { name: "thumbnail" }).src).toContain(photoRawData["thumbnail_url"]);
    expect(screen.getByText("685 x 1024")).toBeTruthy();
  });

  it("Should render bookmark information", () => {
    render(<Bookmark bookmark={videoRawData} />);
    expect(screen.getByRole("heading", { level: 2 })).toEqual(screen.getByText(videoRawData.title));
    expect(screen.getByText("Publié le 21 juin 2021 par BARTERLINK")).toBeTruthy();
    expect(screen.getByText("https://vimeo.com/565486457")).toBeTruthy();
    expect(screen.getByText("Ajouté il y a moins de 1 minute")).toBeTruthy();
  });
  
  it("Should render delete and drag icons", () => {
    render(<Bookmark bookmark={videoRawData} />);
    expect(screen.getByRole("img", {name: "delete"})).toBeTruthy();
    expect(screen.getByRole("img", {name: "drag"})).toBeTruthy();
  })
});
