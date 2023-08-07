import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Carousel from "../Carousel.jsx";

test("lets users click on thumbnails to make them the hero", async () => {
  const images = ["0.jpg", "1.jpg", "2.jpg", "3.jpg"];
  const carousel = render(<Carousel images={images} />);
  const hero = await carousel.findByTestId("hero");
  expect(hero.src).toContain(images[0]);

  for (let index = 0; index < images.length; index++) {
    const image = images[index];
    const thumb = await carousel.findByTestId(`thumbnail${index}`);
    await thumb.click();
    expect(hero.src).toContain(image);
    expect(Array.from(thumb.classList)).toContain("active");
  }

  carousel.unmount();
});
