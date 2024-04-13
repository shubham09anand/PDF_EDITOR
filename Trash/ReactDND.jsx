import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import editFiles from "../Assets/images/pdfIcons/editFiles.png";
import formatFiles from "../Assets/images/pdfIcons/formatFiles.png";
import mergFiles from "../Assets/images/pdfIcons/mergFiles.png";
import splitFiles from "../Assets/images/pdfIcons/splitFiles.png";
import oraganisePages from "../Assets/images/pdfIcons/oraganisePages.png";

const ReactDND = () => {
    const data = [
        {
            "id": 1,
            "name": "Bonnie Green",
            "email": "email@windster.com",
            "image": splitFiles,
            "amount": "$3467"
        },
        {
            "id": 2,
            "name": "Michael Gough",
            "email": "email@windster.com",
            "image": mergFiles,
            "amount": "$67"
        },
        {
            "id": 3,
            "name": "Lana Byrd",
            "email": "email@windster.com",
            "image": oraganisePages,
            "amount": "$367"
        },
        {
            "id": 4,
            "name": "Thomes Lean",
            "email": "email@windster.com",
            "image": formatFiles,
            "amount": "$2367"
        },
        {
          "id": 5,
          "name": "Bonnie Green",
          "email": "email@windster.com",
          "image": "https://images.pexels.com/photos/1755683/pexels-photo-1755683.jpeg?auto=compress&cs=tinysrgb&w=600",
          "amount": "$3467"
      },
      {
          "id": 6,
          "name": "Michael Gough",
          "email": "email@windster.com",
          "image": "https://images.pexels.com/photos/2627945/pexels-photo-2627945.jpeg?auto=compress&cs=tinysrgb&w=600",
          "amount": "$67"
      },
      {
          "id": 7,
          "name": "Lana Byrd",
          "email": "email@windster.com",
          "image": "https://img-getpocket.cdn.mozilla.net/404x202/filters:format(jpeg):quality(60):no_upscale():strip_exif()/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fpocket-curatedcorpusapi-prod-images%2F898980b0-9919-4ff9-a01e-5f0cd8b98c55.jpeg",
          "amount": "$367"
      },
      {
          "id": 8,
          "name": "Michael Gough",
          "email": "email@windster.com",
          "image": "chrome://branding/content/about-logo@2x.png",
          "amount": "$67"
      },
      {
          "id": 9,
          "name": "Lana Byrd",
          "email": "email@windster.com",
          "image": "https://images.pexels.com/photos/1154504/pexels-photo-1154504.jpeg?auto=compress&cs=tinysrgb&w=600",
          "amount": "$367"
      },
      {
          "id": 10,
          "name": "Michael Gough",
          "email": "email@windster.com",
          "image": "https://images.pexels.com/photos/4707869/pexels-photo-4707869.jpeg?auto=compress&cs=tinysrgb&w=600",
          "amount": "$67"
      },
      {
          "id": 11,
          "name": "Lana Byrd",
          "email": "email@windster.com",
          "image": "https://images.pexels.com/photos/4976595/pexels-photo-4976595.jpeg?auto=compress&cs=tinysrgb&w=600",
          "amount": "$367"
      },
    ];

    const [items, setItems] = useState(data);

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const newItems = Array.from(items);
        const [movedItem] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, movedItem);

        setItems(newItems);

        console.log(items)
    };

    return (
        <div>
            <div className="w-full max-w-md p-4 bg-white sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Latest Customers</h5>
                    <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                        View all
                    </a>
                </div>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="customer-list" direction='horizontal vertical'>
                        {(provided) => (
                            <div className='gap-10 flex w-s flex-wrap w-screen creen' {...provided.droppableProps} ref={provided.innerRef}>
                                {items.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                        {(provided) => (
                                            <div
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef}
                                            >
                                                <div className="py-3 w-96 bg-gray-200 px-4 rounded-lg sm:py-4 cursor-pointer hover:opacity-75">
                                                    <div className="flex items-center ">
                                                        <div className="flex-shrink-0">
                                                            <img className="w-8 h-8 rounded-full" src={item.image} alt={item.name + ' image'} />
                                                        </div>
                                                        <div className="flex-1 min-w-0 ms-4">
                                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                                {item.name} {item.id}
                                                            </p>
                                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                                {item.email}
                                                            </p>
                                                        </div>
                                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                            {item.amount}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    );
};

export default ReactDND;
