import React from 'react';
import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainNav from '../src/components/MainNav';

describe("MainNav", () => {
  test("should render the MainNav component", () => {

    render(<Router><MainNav /></Router>);

    expect(screen.getByText(/Home/i)).toBeDefined()
    expect(screen.getByText(/Devices/i)).toBeDefined()
  });
})
