/* eslint-disable testing-library/no-node-access */
import { render, screen } from "@testing-library/react";
import React from "react";
import { PostCard } from '.';
import { postCardPropsMock } from "./mock";

const props = postCardPropsMock;

describe('<PostCard />', () => {
    it('should render PostCard correctly', () => {
        render(<PostCard {...props} />);

        expect(screen.getByRole('img', { name: 'title 1'}))
            .toHaveAttribute('src', 'img/img.png');
        
        expect(screen.getByRole('heading', { name: /title 1/i })).toBeInTheDocument();

        expect(screen.getByText('body 1')).toBeInTheDocument();

    });

    it('should match snapshot', () => {
        const { container } = render(<PostCard {...props} />);
        expect(container.firstChild).toMatchSnapshot();

    })
});