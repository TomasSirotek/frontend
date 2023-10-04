// const data = 
import {test,expect} from '@playwright/test';
import { request } from 'http';
import { Box } from 'src/app/modules/management/models/box';

const API_URL = 'http://localhost:5000/api';

const data : Box = {
    title: 'Test Box',
    type: 'Squared',
    image: 'https://images.unsplash.com/photo-1630448927918-1dbcd8ba439b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    color: 'Red',
    status:'New', 
    description: 'This is testing box',
    price: 23,
}

// test.describe('API Crud testing ', () => {


//     let createdBoxId;

//     test('should create new box', async ({ request }) => {
//         const newBoxResponse = await request.post(`${API_URL}/boxes`, { data });
//         expect(newBoxResponse.status()).toBe(201);
//         expect(newBoxResponse.statusText()).toBe('Created');

//         // Extract the created box's ID from the response
//         const createdBox = await newBoxResponse.json();
//         createdBoxId = createdBox.id;


//         expect(createdBox).toEqual(data);
//     });
  
//     test('should retrieve the created box by ID', async ({ request }) => {
//       // Make sure createdBoxId has a value
//       expect(createdBoxId).toBeDefined();
  
//       const fetchedBoxResponse = await request.get(`${API_URL}/boxes/${createdBoxId}`);
//       expect(fetchedBoxResponse.status()).toBe(200);
  
//       // Remove the ID from the data for comparison
//       delete data.id;
  
//       expect(await fetchedBoxResponse.json()).toEqual(data);
//     });

    

//     test('should get all boxes', async ({ request}) => {

//     })


//     test('should update box by API request', async ({ request }) => {

//     })

//     test('should delete existing box', async ({request }) => {
        
//     })



//   });
  