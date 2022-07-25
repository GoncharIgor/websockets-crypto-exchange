# Technologies to be used
1. BE - web sockets with simple express server
2. FE - React + TypeScript
3. Styling - css modules for styles encapsulation  
In real world scenario I'd choose either Material-UI components library, or Tailwind with Headless-UI. 
But following the requirements, in this solution I'll focus in own css implementation

# Road Map
## BE:
1. Create express server
2. Add websockets to it
3. Define payload contract to FE and make mocks for it

## FE
1. Setup React Typescript app
2. Generate Components:
- Header
- TradingForm 
-- Button
-- Input
- Orderbook
-- Order
3. Create order and send to BE
4. Add dynamic base and trading currencies
5. Add user context

# To add if time allows:
1. Unit tests for UI components
2. Order: creation Modal window
3. Order: creation timestamp
4. Move Active Trading currency to Local Storage
5. Delete order
