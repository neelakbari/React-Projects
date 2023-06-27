import { survey_img } from "../assets"

export const initialData = {
    surveyName: "My Survey",
    currentPage: 1,
    image: survey_img,
    page: [
        {
            id: 1,
            option: [{id: 1, value: ""}],
            dropDownId: 1,
            question: "",
            answer: "",
            required: true,
            description: "",
            image: "",
            layout: 1,
        }
    ]

}

export const DropDownData = [
    {
        id: 1,
        type: "MultipleChoice",
        component:"MultipleChoice",
        icon: "CheckOutlined"
    },
    {
        id: 2,
        type: "Textbox",
        component:"Textbox",
        icon: "DashOutlined"
    },
    {
        id: 3,
        type: "Date",
        component:"Date",
        icon: "CalendarOutlined"
    },
    {
        id: 4,
        type: "Feedback",
        component:"Feedback",
        icon: "StarOutlined"
    },
    {
        id: 5,
        type: "Textarea",
        component:"Textarea",
        icon: "AlignCenterOutlined"
    },
    {
        id: 6,
        type: "Number",
        component:"Textbox",
        icon: "FieldNumberOutlined"
    },
    {
        id: 7,
        type: "Email",
        component:"Textbox",
        icon: "MailOutlined"
    },
    {
        id: 8,
        type: "Website",
        component:"Textbox",
        icon: "LinkOutlined"
    },
    {
        id: 9,
        type: "Phone",
        component:"Textbox",
        icon: "PhoneOutlined"
    },
    
]

export const LayoutData = [
    {
        id: 1,
        name: "layoutOne"
    },
    {
        id: 2,
        name: "layoutTwo"
    },
    {
        id: 3,
        name: "layoutThree"
    }
]

export const pageLayout = {
    id: 1,
    dropDownId: 1,
    description:"",
    question: "...",
    answer: "",
    required: true,
    image: "",
    layout: 1,
    option:[],
}