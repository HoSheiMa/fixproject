
export const introductions=[
    {
        id: 0,
        tittle: 'introduction_course1',
        description: 'This is introduction_course1',
        photo_url: 'https://www.telegraph.co.uk/content/dam/Travel/2019/January/france-food.jpg?imwidth=1400',
        videos: [
            {
                id: 0,
                tittle: 'ic1_video1',
                description: 'This is ic1_video1',
                time: '10:23',
                photo_url: require('../../assets/images/04.jpg'),
            },
            {
                id: 1,
                tittle: 'ic1_video2',
                description: 'This is ic1_video2',
                time: '11:03',
                photo_url: require('../../assets/images/01.jpeg'),
            },
            {
                id: 2,
                tittle: 'ic1_video3',
                description: 'This is ic1_video3',
                time: '9:40',
                photo_url: 'https://www.telegraph.co.uk/content/dam/Travel/2019/January/france-food.jpg?imwidth=1400',
            },
        ]
    }
]
export const my_courses=[
    {
        categoryID: 0,
        courseID: 0,
    },
    {
        categoryID: 0,
        courseID: 1,
    },
]
export const recent_video=[
    {
        categoryID: 0,
        courseID: 0,
        videoID: 0,
    },
    {
        categoryID: 0,
        courseID: 0,
        videoID: 1,
    },
    
]
export const categories= [
    {
        id: 0,
        tittle: 'Category1',
        description: 'This Category1 is category for happy sleeping',
        photo_url: require('../../assets/images/008.png'),
        courses: [
            {   
                id: 0,
                tittle: 'Ca1_Course1',
                description: 'This Ca1_Course1 is course for meditation',
                counts: 3,
                photo_url: require('../../assets/images/07.jpg'),
                videos: [
                    {
                        id: 0,
                        tittle: 'Ca1_Co1_Video1',
                        description: 'This is Ca1_Co1_video1',
                        time: '10:00',
                        photo_url: require('../../assets/images/08.jpg'),
                        video_url:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                    },
                    {
                        id: 1,
                        tittle: 'Ca1_Co1_Video2',
                        description: 'This is Ca1_Co1_video2',
                        time: '10:00',
                        photo_url: require('../../assets/images/07.jpg'),
                        video_url:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
                    },
                    {
                        id: 2,
                        tittle: 'Ca1_Co1_Video3',
                        time: '10:00',
                        description: 'This is Ca1_Co1_video3',
                        video_url:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" ,
                        photo_url: require('../../assets/images/15.jpg'),
                    },
                ],

            },
            {   
                id: 1,
                tittle: 'Ca1_Course2',
                description: 'This Course is course for meditation',
                photo_url: require('../../assets/images/09.jpg'),
                counts: 4,
                videos:[
                    {
                        id: 0,
                        tittle: 'Ca1_Co1_Video1',
                        time: '10:00',
                        description: 'This is Ca1_Co1_video1',
                        video_url:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
                        photo_url: require('../../assets/images/08.jpg'),
                    },
                    {
                        id: 1,
                        tittle: 'Ca1_Co1_Video2',
                        time: '10:00',
                        description: 'This is Ca1_Co1_video2',
                        video_url:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" ,
                        photo_url: require('../../assets/images/15.jpg'),
                    },
                    {
                        id: 2,
                        tittle: 'Ca1_Co1_Video3',
                        time: '10:00',
                        description: 'This is Ca1_Co1_video3',
                        video_url:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
                        photo_url: require('../../assets/images/16.jpg'),
                    },
                    {
                        id: 3,
                        tittle: 'Ca1_Co1_Video4',
                        time: '10:00',
                        description: 'This is Ca1_Co1_video4',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        photo_url: require('../../assets/images/08.jpg'),
                    },
                ]
            },
            {   
                id: 2,
                tittle: 'Ca1_Course3',
                description: 'This Course is course for meditation',
                photo_url: require('../../assets/images/11.png'),
                counts: 5,
                videos:[
                    {
                        id: 0,
                        tittle: 'Ca1_Co1_Video1',
                        time: '10:00',
                        description: 'This is Ca1_Co1_video1',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        photo_url: require('../../assets/images/15.jpg'),
                    },
                    {
                        id: 1,
                        tittle: 'Ca1_Co1_Video2',
                        time: '10:00',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        description: 'This is Ca1_Co1_video2',
                        photo_url: require('../../assets/images/16.jpg'),
                    },
                    {
                        id: 2,
                        tittle: 'Ca1_Co1_Video3',
                        time: '10:00',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        description: 'This is Ca1_Co1_video3',
                        photo_url: require('../../assets/images/08.jpg'),
                    },
                    {
                        id: 3,
                        tittle: 'Ca1_Co1_Video4',
                        time: '10:00',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        description: 'This is Ca1_Co1_video4',
                        photo_url: require('../../assets/images/08.jpg'),
                    },                    
                    {
                        id: 4,
                        tittle: 'Ca1_Co1_Video5',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        time: '10:00',
                        description: 'This is Ca1_Co1_video5',
                        photo_url: require('../../assets/images/16.jpg'),
                    },                    
                ]
            },
            {   
                id: 3,
                tittle: 'Ca1_Course4',
                description: 'This Course is course for meditation',
                photo_url: require('../../assets/images/12.jpg'),
                counts: 6,
                videos:[
                    {
                        id: 0,
                        tittle: 'Ca1_Co1_Video1',
                        time: '10:00',
                        description: 'This is Ca1_Co1_video1',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        photo_url: require('../../assets/images/08.jpg'),
                    },
                    {
                        id: 1,
                        tittle: 'Ca1_Co1_Video2',
                        time: '10:00',
                        description: 'This is Ca1_Co1_video2',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        photo_url: require('../../assets/images/16.jpg'),
                    },
                    {
                        id: 2,
                        tittle: 'Ca1_Co1_Video3',
                        time: '10:00',
                        description: 'This is Ca1_Co1_video3',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        photo_url: require('../../assets/images/12.jpg'),
                    },
                    {
                        id: 3,
                        tittle: 'Ca1_Co1_Video4',
                        time: '10:00',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        description: 'This is Ca1_Co1_video4',
                        photo_url: require('../../assets/images/08.jpg'),
                    },                    
                    {
                        id: 4,
                        tittle: 'Ca1_Co1_Video5',
                        time: '10:00',
                        description: 'This is Ca1_Co1_video5',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        photo_url: require('../../assets/images/16.jpg'),
                    },                       
                    {
                        id: 5,
                        tittle: 'Ca1_Co1_Video6',
                        time: '10:00',
                        description: 'This is Ca1_Co1_video6',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        photo_url: require('../../assets/images/15.jpg'),
                    },                       
                ]
            },
            {   
                id: 4,
                tittle: 'Ca1_Course5',
                description: 'This Course is course for meditation',
                photo_url: require('../../assets/images/16.jpg'),
                counts: 7,
                videos:[
                    {
                        id: 0,
                        tittle: 'Ca1_Co1_Video1',
                        time: '10:00',
                        description: 'This is Ca1_Co1_video1',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        photo_url: require('../../assets/images/08.jpg'),
                    },
                    {
                        id: 1,
                        tittle: 'Ca1_Co1_Video2',
                        time: '10:00',
                        description: 'This is Ca1_Co1_video2',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        photo_url: require('../../assets/images/16.jpg'),
                    },
                    {
                        id: 2,
                        tittle: 'Ca1_Co1_Video3',
                        time: '10:00',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        description: 'This is Ca1_Co1_video3',
                        photo_url: require('../../assets/images/15.jpg'),
                    },
                    {
                        id: 3,
                        tittle: 'Ca1_Co1_Video4',
                        time: '10:00',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        description: 'This is Ca1_Co1_video4',
                        photo_url: require('../../assets/images/08.jpg'),
                    },                    
                    {
                        id: 4,
                        tittle: 'Ca1_Co1_Video5',
                        time: '10:00',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        description: 'This is Ca1_Co1_video5',
                        photo_url: require('../../assets/images/16.jpg'),
                    },                       
                    {
                        id: 5,
                        tittle: 'Ca1_Co1_Video6',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        time: '10:00',
                        description: 'This is Ca1_Co1_video6',
                        photo_url: require('../../assets/images/15.jpg'),
                    },                      
                    {
                        id: 6,
                        tittle: 'Ca1_Co1_Video7',
                        time: '10:00',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        description: 'This is Ca1_Co1_video7',
                        photo_url: require('../../assets/images/08.jpg'),
                    },                      
                ]
            },
            {   
                id: 5,
                tittle: 'Ca1_Course6',
                description: 'This Course is course for meditation',
                photo_url: require('../../assets/images/15.jpg'),
                counts: 8,
                videos:[
                    {
                        id: 0,
                        tittle: 'Ca1_Co1_Video1',
                        time: '10:00',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        description: 'This is Ca1_Co1_video1',
                        photo_url: require('../../assets/images/08.jpg'),
                    },
                    {
                        id: 1,
                        time: '10:00',
                        tittle: 'Ca1_Co1_Video2',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        description: 'This is Ca1_Co1_video2',
                        photo_url: require('../../assets/images/16.jpg'),
                    },
                    {
                        id: 2,
                        tittle: 'Ca1_Co1_Video3',
                        time: '10:00',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        description: 'This is Ca1_Co1_video3',
                        photo_url: require('../../assets/images/15.jpg'),
                    },
                    {
                        id: 3,
                        tittle: 'Ca1_Co1_Video4',
                        time: '10:00',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        description: 'This is Ca1_Co1_video4',
                        photo_url: require('../../assets/images/08.jpg'),
                    },                    
                    {
                        id: 4,
                        tittle: 'Ca1_Co1_Video5',
                        time: '10:00',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        description: 'This is Ca1_Co1_video5',
                        photo_url: require('../../assets/images/16.jpg'),
                    },                       
                    {
                        id: 5,
                        tittle: 'Ca1_Co1_Video6',
                        time: '10:00',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        description: 'This is Ca1_Co1_video6',
                        photo_url: require('../../assets/images/15.jpg'),
                    },                      
                    {
                        id: 6,
                        tittle: 'Ca1_Co1_Video7',
                        time: '10:00',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        description: 'This is Ca1_Co1_video7',
                        photo_url: require('../../assets/images/08.jpg'),
                    },                             
                    {
                        id: 7,
                        tittle: 'Ca1_Co1_Video8',
                        time: '10:00',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        description: 'This is Ca1_Co1_video8',
                        photo_url: require('../../assets/images/15.jpg'),
                    },                             
                ]
            },

        ], 
    },
    {
        id: 1,
        tittle: 'Category2',
        description: 'This Category2 is category for happy sleeping',
        photo_url: require('../../assets/images/002.png'),
        courses: [
            {   
                id: 0,
                tittle: 'Ca2_Course1',
                description: 'This Ca1_Course1 is course for meditation',
                photo_url: require('../../assets/images/07.jpg'),
                counts: 3,
                videos: [
                    {
                        id: 0,
                        time: '11:20',
                        tittle: 'Ca2_Co1_Video1',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        description: 'This is Ca2_Co1_video1',
                        photo_url: require('../../assets/images/08.jpg'),
                    },
                    {
                        id: 1,
                        time: '11:20',
                        tittle: 'Ca2_Co1_Video2',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        description: 'This is Ca2_Co1_video2',
                        photo_url: require('../../assets/images/16.jpg'),
                    },
                    {
                        id: 2,
                        tittle: 'Ca2_Co1_Video3',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        time: '11:20',
                        description: 'This is Ca2_Co1_video3',
                        photo_url: require('../../assets/images/15.jpg'),
                    },
                ],

            },
            {   
                id: 1,
                tittle: 'Ca2_Course2',
                description: 'This Course is course for meditation',
                photo_url: require('../../assets/images/09.jpg'),
                counts: 4,
                videos:[
                    {
                        id: 0,
                        tittle: 'Ca2_Co2_Video1',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        time: '11:20',
                        description: 'This is Ca2_Co2_video1',
                        photo_url: require('../../assets/images/08.jpg'),
                    },
                    {
                        id: 1,
                        tittle: 'Ca2_Co2_Video2',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        time: '11:20',
                        description: 'This is Ca2_Co2_video2',
                        photo_url: require('../../assets/images/16.jpg'),
                    },
                    {
                        id: 2,
                        time: '11:20',
                        tittle: 'Ca2_Co2_Video3',
                        description: 'This is Ca2_Co2_video3',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        photo_url: require('../../assets/images/15.jpg'),
                    },
                    {
                        id: 3,
                        time: '11:20',
                        tittle: 'Ca2_Co2_Video4',
                        description: 'This is Ca2_Co2_video4',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        photo_url: require('../../assets/images/08.jpg'),
                    },
                ]
            },
            {   
                id: 2,
                tittle: 'Ca2_Course3',
                description: 'This Course is course for meditation',
                photo_url: require('../../assets/images/16.jpg'),
                counts: 5,
                videos:[
                    {
                        id: 0,
                        time: '11:20',
                        tittle: 'Ca2_Co3_Video1',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        description: 'This is Ca2_Co3_video1',
                        photo_url: require('../../assets/images/08.jpg'),
                    },
                    {
                        id: 1,
                        time: '11:20',
                        tittle: 'Ca2_Co3_Video2',
                        description: 'This is Ca2_Co3_video2',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        photo_url: require('../../assets/images/16.jpg'),
                    },
                    {
                        id: 2,
                        tittle: 'Ca2_Co3_Video3',
                        time: '11:20',
                        description: 'This is Ca2_Co3_video3',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        photo_url: require('../../assets/images/15.jpg'),
                    },
                    {
                        id: 3,
                        tittle: 'Ca2_Co3_Video4',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        time: '11:20',
                        description: 'This is Ca2_Co3_video4',
                        photo_url: require('../../assets/images/08.jpg'),
                    },                    
                    {
                        id: 4,
                        tittle: 'Ca2_Co3_Video5',
                        time: '11:20',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        description: 'This is Ca2_Co3_video5',
                        photo_url: require('../../assets/images/16.jpg'),
                    },                    
                ]
            },
        ]
    },
    {
        id: 2,
        tittle: 'Category3',
        description: 'This Category3 is category for happy sleeping',
        photo_url: require('../../assets/images/005.png'),
        courses: [
            {   
                id: 0,
                tittle: 'Ca3_Course1',
                description: 'This Ca1_Course1 is course for meditation',
                photo_url: require('../../assets/images/14.jpg'),
                counts: 3,
                videos: [
                    {
                        id: 0,
                        tittle: 'Ca3_Co1_Video1',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        description: 'This is Ca3_Co1_video1',
                        time: '11:20',
                        photo_url: require('../../assets/images/08.jpg'),
                    },
                    {
                        id: 1,
                        tittle: 'Ca3_Co1_Video2',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        description: 'This is Ca3_Co1_video2',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        time: '11:20',
                        photo_url: require('../../assets/images/16.jpg'),
                    },
                    {
                        id: 2,
                        tittle: 'Ca3_Co1_Video3',
                        time: '11:20',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        description: 'This is Ca3_Co1_video3',
                        photo_url: require('../../assets/images/15.jpg'),
                    },
                ],

            },
            {   
                id: 1,
                tittle: 'Ca3_Course2',
                description: 'This Course is course for meditation',
                photo_url: require('../../assets/images/09.jpg'),
                counts: 4,
                videos:[
                    {
                        id: 0,
                        tittle: 'Ca3_Co2_Video1',
                        time: '11:20',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        description: 'This is Ca1_Co1_video1',
                        photo_url: require('../../assets/images/08.jpg'),
                    },
                    {
                        id: 1,
                        tittle: 'Ca3_Co2_Video2',
                        time: '11:20',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        description: 'This is Ca1_Co1_video2',
                        photo_url: require('../../assets/images/16.jpg'),
                    },
                    {
                        id: 2,
                        tittle: 'Ca3_Co2_Video3',
                        description: 'This is Ca1_Co1_video3',
                        time: '11:20',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        photo_url: require('../../assets/images/15.jpg'),
                    },
                    {
                        id: 3,
                        tittle: 'Ca3_Co2_Video4',
                        description: 'This is Ca1_Co1_video4',
                        time: '11:20',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        photo_url: require('../../assets/images/08.jpg'),
                    },
                ]
            },
        ]
    },
    {
        id: 3,
        tittle: 'Category4',
        description: 'This Category4 is category for happy sleeping',
        photo_url: require('../../assets/images/004.png'),
        courses: [
            {   
                id: 0,
                tittle: 'Ca4_Course1',
                description: 'This Ca1_Course1 is course for meditation',
                photo_url: require('../../assets/images/16.jpg'),
                counts: 3,
                videos: [
                    {
                        id: 0,
                        tittle: 'Ca4_Co1_Video1',
                        time: '11:20',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        description: 'This is Ca1_Co1_video1',
                        photo_url: require('../../assets/images/08.jpg'),
                    },
                    {
                        id: 1,
                        time: '11:20',
                        tittle: 'Ca4_Co1_Video2',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        description: 'This is Ca1_Co1_video2',
                        photo_url: require('../../assets/images/15.jpg'),
                    },
                    {
                        id: 2,
                        time: '11:20',
                        tittle: 'Ca4_Co1_Video3',
                        video_url:'http://techslides.com/demos/sample-videos/small.mp4',
                        description: 'This is Ca1_Co1_video3',
                        photo_url: require('../../assets/images/16.jpg'),
                    },
                ],

            },
        ]
    },
    
]

export const experiences= [
    {
        id: 1,
        username: 'David Cueva',
        email: 'david303@gmail.com',
        ranking: 3,
        contents: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
    {
        id: 2,
        username: 'Diana Zatsepina',
        email: 'diana03@mail.ru',
        ranking: 4,
        contents: "Wow...just wow. I love this class!. I went through this tunnel and kept seeing faces. I still don't know where this tunnel is leading me to, but I'm sure I''ll find out next time. I am still processing.",
    },
]

export const users=[
    {
        id: 1,
        name: 'David Cueva',
        email: 'david303@gmail.com',
        avartar: require('../../assets/images/Boyle.jpg'),
        paid: false,
        password: '111111111',
    },
    {
        id: 2,
        name: 'Maxim ivonovich',
        email: 'maxim1203@mail.ru',
        avartar: require('../../assets/images/carl.jpg'),
        paid: true,
        password: '222222222',
    },
    {
        id: 3,
        name: 'Boris Adamovich',
        email: 'boris913@mail.ru',
        avartar: require('../../assets/images/garry.jpg'),
        password: '333333333',
        paid: false,
    },
    {
        id: 4,
        name: 'Diana Zatsepina',
        email: 'diana03@mail.ru',
        avartar: require('../../assets/images/katherine.jpg'),
        password: '444444444',
        paid: false,
    },

]

export const Talks = [
    {
        id: 0,
        title: 'Talk1',
        description: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        time: '24:15:05',
        maker: 'anton',
        image_url: 'https://i.imgur.com/UYiroysl.jpg'
    },
    {
        id: 1,
        title: 'Talk2',
        description: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        time: '10:23:34',
        maker: 'diana',
        image_url: 'https://i.imgur.com/UPrs1EWl.jpg'
    },
    {
        id: 2,
        title: 'Talk3',
        time: '5:20:00 ',
        description: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        maker: 'sergey',
        image_url: 'https://i.imgur.com/MABUbpDl.jpg'
    },
    {
        id: 3,
        title: 'Talk4',
        time: '9:33:22',
        description: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        maker: 'maxim',
        image_url: 'https://i.imgur.com/KZsmUi2l.jpg'
    },
    {
        id: 4,
        title: 'Talk5',
        description: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        time: '12:22:32',
        maker: 'aaaa',
        image_url: 'https://i.imgur.com/2nCt3Sbl.jpg'
    },
    {
        id: 5,
        title: 'Talk6',
        time: '3:00:00',
        description: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        maker: 'bbb',
        image_url: 'https://i.imgur.com/lceHsT6l.jpg'
    },
    {
        id: 6,
        title: 'Talk7',
        time: '9:33:22',
        description: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        maker: 'maxim',
        image_url: 'https://i.imgur.com/KZsmUi2l.jpg'
    },
    {
        id: 7,
        title: 'Talk8',
        description: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        time: '12:22:32',
        maker: 'aaaa',
        image_url: 'https://i.imgur.com/2nCt3Sbl.jpg'
    },
    {
        id: 8,
        title: 'Talk9',
        time: '3:00:00',
        description: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        maker: 'bbb',
        image_url: 'https://i.imgur.com/lceHsT6l.jpg'
    }
];
