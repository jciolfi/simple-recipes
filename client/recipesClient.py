# Imports
import requests
import getpass
import json
import sys

base_url = 'http://localhost:8080'
users_url = f'{base_url}/users'
recipes_url = f'{base_url}/recipes'

# Print json data with formatting
def print_json(data):
    print(json.dumps(data, indent=2))

# Create account
def create_account(email, password, username):
    body = {
        'email': email,
        'pass': password,
        'username': username
    }
    r = requests.post(users_url, json=body)
    return {
        'status_code': r.status_code,
        'data': r.json()
    }

# Login to existing account
def login(email, password):
    body = {
        'email': email,
        'pass': password
    }
    r = requests.post(f'{users_url}/login', json=body)
    return {
        'status_code': r.status_code,
        'data': r.json()
    }

# Delete existing account
def delete_account(user_id):
    r = requests.delete(f'{users_url}/{user_id}')
    return {
        'status_code': r.status_code,
        'data': r.json()
    }


# Create recipe
def create_recipe(recipe_body):
    r = requests.post(recipes_url, json=recipe_body)
    return {
        'status_code': r.status_code,
        'data': r.json()
    }


# Update recipe
def update_recipe(recipe_id, recipe_body):
    r = requests.put(f'{recipes_url}/{recipe_id}', json=recipe_body)
    return {
        'status_code': r.status_code,
        'data': r.json()
    }


# Get Recipe by criteria
def get_recipes_by_criteria(title=None, user=None, tags=None):
    filters_arr = []
    if title:
        filters_arr.append(f'title={title}')
    if user != None:
        filters_arr.append(f'user={user}')
    if tags:
        filters_arr.append(f'tags={tags}')
    filters = '&'.join(filters_arr)
    if len(filters_arr) > 0:
        filters = '?' + filters
    r = requests.get(f'{recipes_url}{filters}')

    return {
        'status_code': r.status_code,
        'data': r.json()
    }


def get_recipe_by_id(recipe_id):
    r = requests.get(f'{recipes_url}/{recipe_id}')
    return {
        'status_code': r.status_code,
        'data': r.json()
    }


# Get tools
def get_tools():
    r = requests.get(f'{recipes_url}/tools')
    return {
        'status_code': r.status_code,
        'data': r.json()
    }


# Get tags
def get_tags():
    r = requests.get(f'{recipes_url}/tags')
    return {
        'status_code': r.status_code,
        'data': r.json()
    }


# Delete recipe by ID
def delete_recipe(recipe_id):
    r = requests.delete(f'{recipes_url}/{recipe_id}')
    return {
        'status_code': r.status_code,
        'data': r.json()
    }


# Auth Flow
def auth_flow():
    auth_method = None
    while auth_method is None or auth_method not in ['l', 's']:
        if auth_method is not None:
            print('Inalid input. Please enter "l" to log in or "s" to sign up.\n')
        auth_method = input('Do you want to login (enter: "l") or sign up (enter "s")? ')

    print()
    user_id = None

    if auth_method == 's':
        while user_id is None:
            email = input('Enter email: ')
            password = getpass.getpass('Enter password: ')
            username = input('Enter username: ')
            create_res = create_account(email, password, username)
            if create_res['status_code'] != 201:
                print(f'Error: {create_res["data"]["message"]}. Please try again.\n')
            else:
                user_id = create_res['data']['userID']

    if auth_method == 'l':
        while user_id is None:
            email = input('Enter email: ')
            password = getpass.getpass('Enter password: ')
            login_res = login(email, password)
            if login_res['status_code'] != 200:
                print(f'Error: {login_res["data"]["message"]}. Please try again.\n')
            elif not login_res['data']['authenticated']:
                print(f'Error: the email or password is incorrect. Please try again.\n')
            else:
                user_id = login_res['data']['userID']

    print('Welcome!')
    return user_id


def list_tools():
    tools_resp = get_tools()
    if tools_resp['status_code'] == 200:
        print('Available tools:')
        for i, item in enumerate(tools_resp['data']['tools']):
            print(f'{i + 1})', item['toolName'])
        return tools_resp['data']['tools']
    else:
        print('Error retrieving tools. Please try restarting the application.')
        return []


def list_tags():
    tags_resp = get_tags()
    if tags_resp['status_code'] == 200:
        print('Available tags:')
        for i, item in enumerate(tags_resp['data']['tags']):
            print(f'{i + 1})', item['tagName'])
        return tags_resp['data']['tags']
    else:
        print('Error retrieving tags. Please try restarting the application.')
        return []


def enter_recipe_details(author_id):
    try:
        title = input('Enter title of recipe: ')
        assert (len(title) > 0)

        num_ingredients = input('How many ingredients required (1-10): ')
        assert (1 <= int(num_ingredients) <= 10)
        ingredients = []
        for i in range(int(num_ingredients)):
            name = input('Enter description of ingredient (cannot contain @@ or ##): ')
            assert (len(name) > 0)
            assert (not ('@@' in name or '##' in name))
            amount = input('Enter amount of ingredient used in recipe: ')
            assert (len(amount) > 0)
            ingredient = {
                'ingredientName': name,
                'amount': amount
            }
            ingredients.append(ingredient)

        prep_time = input('Enter time it takes to prepare recipe in minutes: ')
        assert (int(prep_time) > 0)

        servings = input('Enter number of servings: ')
        assert (int(servings) > 0)

        instructions = input('Enter the recipe instructions (250 words or less): ')
        assert (len(instructions.split(' ')) <= 250)

        avail_tools = list_tools()
        tools_list = input('Enter required tools for recipe separated with commas (e.g. "1,3,10"): ')
        tools = [int(t) for t in tools_list.split(',')]
        if not all(1 <= t <= len(avail_tools) for t in tools):
            raise ValueError()

        avail_tags = list_tags()
        tags_list = input('Enter tags that match the recipe separated with commas (e.g. "1,3,10"): ')
        tags = [int(t) for t in tags_list.split(',')]
        if not all(1 <= t <= len(avail_tags) for t in tags):
            raise ValueError()

        return {
            'authorID': author_id,
            'title': title,
            'prepTime': int(prep_time),
            'servings': int(servings),
            'instructions': instructions,
            'ingredients': ingredients,
            'tools': tools,
            'tags': tags
        }
    except:
        print('Invalid input received. Please follow the prompts and enter the recipe again.\n')
        return None


def create_recipe_flow(user_id):
    body = None
    while body is None:
        body = enter_recipe_details(user_id)
    create_resp = create_recipe(body)
    if create_resp['status_code'] == 201:
        print(f'Successfully created recipe!')
    else:
        print(f'Error: {create_resp["data"]["message"]}. Please try again.\n')


def list_existing_recipes(user_id):
    user_recipes = get_recipes_by_criteria('', user_id)
    if user_recipes['status_code'] == 200:
        if len(user_recipes['data']) == 0:
            print('You have no recipes created with this account!')
        else:
            for i, item in enumerate(user_recipes['data']):
                print(f'{i + 1})', item['title'])
        return user_recipes['data']
    else:
        print('Warning: failed to retrieve your existing recipes.\n')
        return []


def select_recipe_flow(user_recipes):
    recipe_id = None
    try:
        recipe_idx = int(input('Choose the recipe number you would like to edit: '))
        assert (1 <= recipe_idx <= len(user_recipes))
        recipe_id = user_recipes[recipe_idx - 1]['recipeID']
    except:
        print('You must enter a valid recipe number from the list. Please try again.\n')
        return None
    get_res = get_recipe_by_id(recipe_id)
    if get_res['status_code'] == 200:
        print('\nHere are the existing details:')
        recipe_details = get_res["data"].copy()
        del recipe_details["recipeID"]
        del recipe_details["authorName"]
        print_json(recipe_details)
        print()
    else:
        print('Warning: could not retrieve existing recipe details')
    return recipe_id


def update_recipe_flow(user_id):
    user_recipes = list_existing_recipes(user_id)
    if len(user_recipes) == 0:
        return

    recipe_id = None
    while recipe_id is None:
        recipe_id = select_recipe_flow(user_recipes)
    body = None
    while body is None:
        body = enter_recipe_details(user_id)
    update_res = update_recipe(recipe_id, body)
    if update_res['status_code'] == 200:
        print('Successfully updated recipe!')
    else:
        print(f'Error: {update_res["data"]["message"]}. Please try again.\n')


def search_recipe_flow():
    try:
        print('To omit title or tags from query, just press enter in input box.')
        title = input('Enter recipe name: ')
        avail_tags = list_tags()
        tag_nums = input('Enter tag numbers separated with commas (e.g. "1,3,10"): ')
        tags = []
        if tag_nums:
            tags = [avail_tags[int(i) - 1]['tagName'] for i in tag_nums.split(',')]
        search_res = get_recipes_by_criteria(title, None, ','.join(tags))
        if search_res['status_code'] == 200:
            print('Matching recipes:')
            print_json(search_res['data'])
        else:
            print(f'Error: {search_res["data"]["message"]}. Please try again.\n')
    except:
        print('Invalid input received. Please try again.\n')


def delete_recipe_flow(user_id):
    user_recipes = list_existing_recipes(user_id)
    if len(user_recipes) == 0:
        return
    recipe_id = None
    while recipe_id is None:
        recipe_id = select_recipe_flow(user_recipes)
    confirmation = input('\nAre you sure you want to delete this recipe? (y/n):').lower()
    if confirmation == 'y':
        delete_res = delete_recipe(recipe_id)
        if delete_res['status_code'] == 200:
            print('Successfully deleted recipe!')
        else:
            print(f'Error: {update_res["data"]["message"]}. Please try again.\n')
    elif confirmation == 'n':
        print('Your recipe was not deleted.')
    else:
        print('You must enter one of "y" or "n". Please try again.\n')


def delete_account_flow(user_id):
    print('Your existing recipes:')
    user_recipes = list_existing_recipes(user_id)
    confirmation = input('Are you sure you want to delete your account? (y/n):').lower()
    if confirmation == 'y':
        delete_res = delete_account(user_id)
        if delete_res['status_code'] == 200:
            print('Successfully deleted account!')
        else:
            print(f'Error: {update_res["data"]["message"]}. Please try again.\n')
    elif confirmation == 'n':
        print('Your account was not deleted.')
    else:
        print('You must enter one of "y" or "n". Please try again.\n')
        delete_account_flow(user_id)

def run_simplerecipes():
    user_id = auth_flow()
    while True:
        action_menu = '''
1) Create a new recipe
2) Update one of your existing recipes
3) Search for a recipe
4) Delete one of your existing recipes
5) Switch accounts
6) Delete your account
7) End the program
Enter a number to perform the corresponding action: '''
        action_id = input(action_menu)
        print()
        if action_id == '1':
            create_recipe_flow(user_id)
        elif action_id == '2':
            update_recipe_flow(user_id)
        elif action_id == '3':
            search_recipe_flow()
        elif action_id == '4':
            delete_recipe_flow(user_id)
        elif action_id == '5':
            user_id = auth_flow()
        elif action_id == '6':
            delete_account_flow(user_id)
            user_id = auth_flow()
        elif action_id == '7':
            break
        else:
            print('Invalid input. Please enter a valid number from 1-7.')

    print('\nThank you for using SimpleRecipes!')
    sys.exit()



if __name__ == '__main__':
    run_simplerecipes()