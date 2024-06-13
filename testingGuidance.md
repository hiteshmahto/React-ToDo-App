# Testing Guidance for React To-Do App
## Introduction
Testing is crucial to ensure that the application functions correctly and meets all requirements. This guide will help you test the various functionalities of your React Todo app.

### Prerequisites
- Ensure you have Node.js and npm installed.
- Your React app should be set up and running correctly.

### Tools
- Jest: JavaScript testing framework.
- React Testing Library: To test React components.
- Cypress: For end-to-end testing.

## Installation
Install the necessary testing libraries:
```bash
  npm install --save-dev jest @testing-library/react @testing-library/jest-dom
  npm install --save-dev cypress
```

## Unit Tests

### 1. Testing Form Components

- Verify that the form components render correctly.
- Ensure the form submission works and calls the correct functions.
- Test input change events to ensure the state updates correctly.

```bash
  // TodoForm.test.js
  import React from 'react';
  import { render, fireEvent } from '@testing-library/react';
  import { TodoForm } from './TodoForm';

  test('renders the TodoForm component', () => {
    const { getByPlaceholderText, getByText } = render(<TodoForm addTodo={() => {}} />);
    expect(getByPlaceholderText('What is the task today?')).toBeInTheDocument();
    expect(getByText('Add Task')).toBeInTheDocument();
  });

  test('submits the form with input value', () => {
    const addTodo = jest.fn();
    const { getByPlaceholderText, getByText } = render(<TodoForm addTodo={addTodo} />);
    const input = getByPlaceholderText('What is the task today?');
    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(getByText('Add Task'));
    expect(addTodo).toHaveBeenCalledWith('New Todo');
  });
```

### 2. Testing Todo Component

- Verify that the todo items render correctly.
- Ensure the edit and delete functions are called when the respective icons are clicked.
- Test the toggle complete functionality.

```bash
  // Todo.test.js
  import React from 'react';
  import { render, fireEvent } from '@testing-library/react';
  import { Todo } from './Todo';

  const mockTodo = { id: 1, task: 'Sample Task', completed: false };

  test('renders the Todo component', () => {
    const { getByText } = render(<Todo task={mockTodo} deleteTodo={() => {}} editTodo={() => {}} toggleComplete={() => {}} />);
    expect(getByText('Sample Task')).toBeInTheDocument();
  });

  test('calls deleteTodo when delete icon is clicked', () => {
      const deleteTodo = jest.fn();
      const { getByTestId } = render(<Todo task={mockTodo} deleteTodo={deleteTodo} editTodo={() => {}} toggleComplete={() => {}} />);
    fireEvent.click(getByTestId('delete-icon'));
    expect(deleteTodo).toHaveBeenCalledWith(mockTodo.id);
  });

  test('calls toggleComplete when task text is clicked', () => {
    const toggleComplete = jest.fn();
    const { getByText } = render(<Todo task={mockTodo} deleteTodo={() => {}} editTodo={() => {}} toggleComplete={toggleComplete} />);
    fireEvent.click(getByText('Sample Task'));
    expect(toggleComplete).toHaveBeenCalledWith(mockTodo.id);
  });
```

## Running the Tests
### - Unit and Integration Tests: Run with Jest.
```bash
  npm test
```
### - End-to-End Tests: Run with Cypress.
```bash
  npx cypress open
```