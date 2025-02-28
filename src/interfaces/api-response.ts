export interface ApiResponse {
    total_results: number,
    no_results: string,
    query: string,
    context: string,
    title: string,
    inputs: any[] | null,
    groups: Group[],
    page: number,
    show_ads: boolean
}

interface Group {
    show_ads: boolean,
    items: Item[],
    total_results: number,
    ad: string
}

interface Item {
    link: string,
    alt: string,
    entry_id: any | null,
    is_photo: boolean,
    image: string,
    image_style: string,
    image_masonry: string,
    image_masonry_style: string,
    image_masonry_width: number,
    image_masonry_height: number,
    list_image: string,
    veiled_image: string,
    next_link: string,
    previous_link: string,
    created_at: string,
    updated_at: string,
    creator_id: number,
    add_link: string,
    author_name: string,
    author_link: string,
    not_photo: boolean,
    title: string,
    comments_count: number,
    type: string,
    thumbable_type: string,
    favorite_link: string,
    favorite_count: number,
    views_count: number,
    updated_date_string: string,
    created_date_string: string,
    like_count: number,
    dislike_count: number,
    like_link: string,
    dislike_link: string,
    image_thumbnail_style: string,
    active: boolean,
    inactive: boolean,
    nsfw: boolean,
    sfw: boolean,
    spoiler: boolean,
    not_spoiler_or_nsfw: boolean,
    tags: Tag[],
    has_tags: boolean,
    comments_allowed: boolean,
    comments_link: string,
    id: number,
    offset: number,
    lazy: boolean,
    not_lazy: boolean,
    show_ads: boolean
}

interface Tag {
    title: string,
    link: string,
    data: string
}