import React, {Component} from 'react'
import Category from '../../models/categoryModel'
import Pager from 'react-pager'
import toastr from 'toastr'

let categoryModule = new Category()

export default class Categories extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: 0,
            category: {name: ''},
            edit: false,
            categories: [],
            pageCategories: [],
            total: 0,
            current: 0,
            visiblePage: 10,
            submitDisabled: false
        }
        this.bindEventHandlers()
    }

    onChangeHandler(event) {
        this.setState({
            current: 0
        })
        this.setState({
            pageCategories: this.state.categories,
            total: Math.ceil(this.state.posts.length / 10),
        })
    }

    handlePageChanged(newPage) {
        this.setState({
            current: newPage,
            total: Math.ceil(this.state.categories.length / 10),
            pageCategories: this.state.categories.slice(newPage * this.state.visiblePage, (newPage * this.state.visiblePage) + 10)
        })
    }

    bindEventHandlers() {
        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.onLoadSuccess = this.onLoadSuccess.bind(this)
        this.handlePageChanged = this.handlePageChanged.bind(this)
        this.createCategory = this.createCategory.bind(this)
        this.deleteCategory = this.deleteCategory.bind(this)
        this.editCategory = this.editCategory.bind(this)
        this.changeCategoryState = this.changeCategoryState.bind(this)
        this.confirmEdit = this.confirmEdit.bind(this)
        this.onSubmitResponse = this.onSubmitResponse.bind(this)
    }

    componentDidMount() {
        categoryModule.getAllCategories(this.onLoadSuccess)
    }

    onLoadSuccess(categories) {
        this.setState({
            edit: false,
            categories: categories.sort((a, b) => {
                return b._kmd.lmt.localeCompare(a._kmd.lmt)
            }),
            pageCategories: categories.slice(this.state.current * this.state.visiblePage, (this.state.current * this.state.visiblePage) + 10),
            total: Math.ceil(categories.length / 10),
        })
    }

    createCategory() {
        this.setState({submitDisabled: true})
        let name = this.state.category.name
        if (name.length < 5) {
            toastr.error('Category name must be at least 5 symbols!')
            this.setState({submitDisabled: false})
        } else {
            categoryModule.createCategory(name, this.onSubmitResponse)
        }
    }

    onSubmitResponse(response) {
        if (response === 'create') {
            categoryModule.getAllCategories(this.onLoadSuccess)
            toastr.success('Category added successfully!')
            this.setState({category: {name: ''}, submitDisabled: false})
        } else if (response === 'duplicate') {
            toastr.error('Category with this name already exists!')
            this.setState({category: {name: ''}, submitDisabled: false})
        }
        else if (response === 'delete') {
            categoryModule.getAllCategories(this.onLoadSuccess)
            toastr.info('Category successfully deleted!')
        }
        else if (response === 'edit') {
            categoryModule.getAllCategories(this.onLoadSuccess)
            toastr.info('Category successfully edited!')
            this.setState({category: {name: ''}, submitDisabled: false})
        }
    }

    deleteCategory(cat) {
        categoryModule.deleteCategory(cat._id, this.onSubmitResponse)
    }

    editCategory(cat) {
        this.setState({
            id: cat._id,
            edit: true,
            category: cat
        })
    }

    confirmEdit() {
        let newName = this.state.category.name
        categoryModule.editCategory(this.state.id, newName, this.onSubmitResponse)
    }

    changeCategoryState(event) {
        let val = event.target.value
        this.setState({
            category: {
                name: val
            }
        })
    }

    render() {

        if (this.state.edit) {

            return (
                <div>
                    <div className="form-group">
                        <label>Category name:</label>
                        <input id="NewCategory"
                               className="form-control"
                               type="text"
                               name="title"
                               value={this.state.category.name}
                               onChange={this.changeCategoryState}
                        />
                    </div>
                    <button id="editCategory" className="btn btn-primary" onClick={this.confirmEdit}>Edit</button>
                </div>
            )

        } else {
            let categoryRows = this.state.pageCategories.map(category =>
                <tr key={category._id}>
                    <td>{category.name}</td>
                    <td>{new Date(Date.parse(category._kmd.lmt)).toLocaleString()}</td>
                    <td>
                        <button className="btn btn-danger" onClick={() => this.deleteCategory(category)}>Delete</button>
                        <button className="btn btn-warning" onClick={() => this.editCategory(category)}>Edit</button>
                    </td>
                </tr>
            )

            return (
                <div>
                    <h1>All Categories</h1>
                    <br/>
                    <div className="form-group">
                        <label>Category name:</label>
                        <input id="Category" className="form-control" type="text" name="title"
                               value={this.state.category.name} onChange={this.changeCategoryState}/>
                    </div>
                    <button id="createCategory" className="btn btn-primary" onClick={this.createCategory}
                            disabled={this.state.submitDisabled}>Create New
                        Category
                    </button>
                    <br/>
                    <br/>
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>Category name</th>
                            <th>Date of publication</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {categoryRows}
                        </tbody>
                    </table>
                    <Pager
                        total={this.state.total}
                        current={this.state.current}
                        visiblePages={this.state.visiblePage}
                        titles={{first: '<|', last: '>|'}}
                        onPageChanged={this.handlePageChanged}
                    />
                </div>
            )
        }
    }
}
