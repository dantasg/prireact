const { render, screen /*fireEvent*/ } = require('@testing-library/react');
const { default: userEvent } = require('@testing-library/user-event');
const { Button } = require('.');

describe('<Button />', () => {
  it('text', () => {
    expect(1).toBe(1);
  });

  it('should render the button with the text "Load more"', () => {
    const fn = jest.fn();
    render(<Button text="load more" onClick={fn} />);

    expect.assertions(2);

    const button = screen.getByRole('button', { name: /load more/i });

    expect(button).toHaveAttribute('class', 'button');

    expect(button).toBeInTheDocument();
  });

  it('should call function on button click', () => {
    const fn = jest.fn();
    render(<Button text="load more" onClick={fn} />);

    const button = screen.getByRole('button', { name: /load more/i });

    userEvent.click(button); // Melhor usar esse, mais natural

    // fireEvent.click(button);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled is true', () => {
    const fn = jest.fn();
    render(<Button text="load more" disabled={true} onClick={fn} />);

    const button = screen.getByRole('button', { name: /load more/i });

    expect(button).toBeDisabled();
  });

  it('should be disabled when disabled is false', () => {
    const fn = jest.fn();
    render(<Button text="load more" disabled={false} onClick={fn} />);

    const button = screen.getByRole('button', { name: /load more/i });

    expect(button).not.toBeDisabled();
  });
});
