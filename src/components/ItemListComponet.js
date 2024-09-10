import React, { memo } from 'react';

const ITEM_HEIGHT = 35;
const TABLE_WIDTH = '100%';

const ItemList = memo(({ items, startIndex, endIndex }) => {
  // Height of the container to enable scrolling
  const containerHeight = items.length * ITEM_HEIGHT;

  return (
    <div
      style={{
        height: `${containerHeight}px`,  // Set the height based on the number of items
        width: TABLE_WIDTH,
        position: 'relative',
        overflow: 'hidden', // Hide overflowing content
      }}
    >
      <table
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: TABLE_WIDTH,
          borderCollapse: 'collapse',
          tableLayout: 'fixed',
        }}
      >
        <thead>
            <tr><th style={{position : '0 1px 0 0'}}>user Listing</th></tr>
          {/* <tr>
            <th style={{ position :'' , padding: '8px', borderBottom: '1px solid #ddd', width: '100%' }}>ID</th>
            <th style={{ position :'' , padding: '8px', borderBottom: '1px solid #ddd', width: '100%' }}>User Name</th>
            <th style={{ position :'' , padding: '8px', borderBottom: '1px solid #ddd', width: '100%' }}>Address</th>
          </tr> */}
        </thead>
        <tbody>
          {items.slice(startIndex, endIndex).map(({ id, name, adress }, index) => (
            <tr
              key={id}
              style={{
                position: 'absolute',
                top: `${(startIndex + index) * ITEM_HEIGHT}px`,
                height: `${ITEM_HEIGHT}px`,
                width: TABLE_WIDTH,
                boxSizing: 'border-box',
                borderBottom: '1px solid #eee',
                padding: '50px 0 0 0'
              }}
            >
              <td style={{ padding: '8px' }}>{id}</td>
              <td style={{ padding: '8px' }}>{name}</td>
              <td style={{ padding: '8px' }}>{adress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default ItemList;
